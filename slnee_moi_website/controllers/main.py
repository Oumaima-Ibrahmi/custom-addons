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
        leaves = request.env['hr.leave'].search([], order='date_create desc')
        values = {
            "leaves": leaves,
        }
        response = http.Response(
            template='slnee_moi_wbesite.dashboard_options', qcontext=values)
        return response.render()