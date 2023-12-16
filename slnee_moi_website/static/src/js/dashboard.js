odoo.define('slnee_moi_website.dashboard', function(require){
	'use strict';

	var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var QWeb = core.qweb;

    var Dashboard = publicWidget.Widget.extend({
        selector: '.dashboard-options',
        xmlDependencies: [
			"/slnee_moi_website/static/src/xml/templates.xml",
		],
        start: function () {
			var self = this;
            return this._super.apply(this, arguments).then(function () {
//                var $container = self.$el.find('.collections_list_data_holder');
//                $container.empty();
                return self._rpc({
                    route: "/get-options",
                }).then(function (data) {
					console.log(data);
                	var $dashboard = $(QWeb.render('slnee_moi_dashboard_options', {
                        user: data.user,
                    }));
                	self.$el.empty();
                	$dashboard.find('.js_buttons').each(function(index, elem){
                		$(elem).click((ev) => self._onClick(ev, self));
                	});
					self.$el.append($dashboard);
//					self.$el.html(QWeb.render('slnee_moi_dashboard_options'));
                });
			});
        },
        _onClick: function(ev, self){
        	var title = $(ev.currentTarget).find('h4.c-dashboardInfo__title span').text();
        	var api = $(ev.currentTarget).data().api;
        	var id = $(ev.currentTarget).data().id;
        	self._rpc({
				route: api,
			}).then(function (data) {
				console.log(data);
				var $container = $('.data_selected_option');
				var $datatable = $(QWeb.render('slnee_moi_dashboard_datatable', {
					title: title,
					leaves: data.leaves,
					datatable_head: data.datatable_head,
					id: id
				}));
				$container.empty();
				$container.append($datatable);
				var data_table = new DataTable('#'+id, {
					columnDefs: [
						{
							orderable: false,
							className: 'select-checkbox',
							targets: 6
						}
					],
					select: {
						style: 'multi',
						selector: 'td:last-child'
					},
					order: [[1, 'asc']]
				});

				$('.select-all').change(function() {
					if ($(this)[0].checked) {
						$(this).closest('table').find('tbody tr').removeClass('selected');
						$(this).closest('table').find('tbody tr').addClass('selected');
					} else {
						$(this).closest('table').find('tbody tr').removeClass('selected');
					}
				});

				$container.find('.icon-view').each(function(index, elem){
					$(elem).click((ev) => self._viewModal(ev, self));
				});
			});
        },
        _viewModal: function(ev, self) {
        	var api = $(ev.currentTarget).data().api;
        	var title = $(ev.currentTarget).closest('h3').text();

        	self._rpc({
				route: api,
			}).then(function (data) {
				console.log("data:", data);
				var $modal = $('#modal_view .modal-content');
				var $modal_content = $(QWeb.render('slnee_moi_view_leave', {
					title: title,
					data: data[0],
				}));
				$modal.empty();
				$modal.append($modal_content);
			});
        }
	});

    publicWidget.registry.Dashboard = Dashboard;

    return Dashboard;
})