odoo.define('slnee_moi_website.dashboard', function(require){
	'use strict';

	var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var QWeb = core.qweb;

    var Dashboard = publicWidget.Widget.extend({
        selector: '.dashboard-options',
        start: function () {
			var self = this;
			console.log('tessssssst');
            return this._super.apply(this, arguments).then(function () {
//                var $container = self.$el.find('.collections_list_data_holder');
                $container.empty();
                return self._rpc({
                    route: "/get-options",
                }).then(function (data) {
                	if (data){
                		self.$el.append(data);
                	}
                });
			});
        }
	});
})