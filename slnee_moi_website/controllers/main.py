from odoo import http
from odoo.http import request

class SlneeRoutes(http.Controller):

    @http.route('/my-home', type='http', auth="public", website=True)
    def myHome(self):

        return request.render('slnee_moi_website.my_homepage')

    @http.route('/my/dashboard', type='http', auth="user", website=True)
    def myDashboard(self):
        leaves = request.env['hr.leave'].search([], order='create_date desc')
        values = {
            "leaves": leaves,
        }
        return request.render('slnee_moi_website.my_dashboard', values)

    @http.route('/get-options', auth="user", type='json', method=['POST'])
    def getOptions(self):
        leaves = request.env['hr.leave'].search_read([], [], order='create_date desc')
        user = request.env['hr.employee'].sudo().search_read([('user_id', '=', request.env.user.id)], [])
        values = {
            "leaves": leaves,
            "user": user[0] if user else None,
        }
        return values

    @http.route([
        '/get-leaves',
        '/get-leaves/<string:status>'
    ], auth="user", type='json', method=['POST'])
    def getLeaves(self, status=None):
        domain = []
        if status:
            domain = [('status', '=', status)]

        leaves = request.env['hr.leave'].search_read(domain, [], order='create_date desc')

        datatable_head = ['الحالة', 'إسم الموظف', 'نوعية الطلب', 'رقم الطلب', 'تاريخ الإنشاء']

        values = {
            "datatable_head": datatable_head,
            "leaves": leaves
        }

        return values

    @http.route([
        '/get-leave/<model("hr.leave"):leave>',
    ], auth="user", type='json', method=['POST'])
    def getLeaveById(self, leave=None):
        if leave:
            return leave.read()
        else:
            return {"error": "Not Found!"}
