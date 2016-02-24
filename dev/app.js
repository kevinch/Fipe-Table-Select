window.namespace = window.namespace || {};
namespace.subnamespace = namespace.subnamespace || {};

(function (window, document, $) {
    'use strict';

    namespace.subnamespace.Module = function () {
        var vehicle_type,
            vehicle_brand_id,
            vehicle_model_key,
            vehicle_model_year;

        var $fts_select_type  = $('#fts-select-type'),
            $fts_select_brand = $('#fts-select-brand'),
            $fts_select_model = $('#fts-select-model'),
            $fts_select_years = $('#fts-select-years'),
            $fts_model_data   = $('#fts-model-data');

        var fipe_api_base_url = "http://fipeapi.appspot.com/api/1/";

        function publicMethod () {
            $fts_select_type.on('change', function() {
                vehicle_type = $(this).val();
                console.log('Vehicle type: '+vehicle_type);

                var firstPromise = $.get(fipe_api_base_url+vehicle_type+"/marcas.json");
                $.when(firstPromise).done(function(firstData) {
                    // console.log(firstData);
                    firstData.forEach(function(item) {
                        $fts_select_brand.append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    });
                });
            });

            $fts_select_brand.on('change', function() {
                vehicle_brand_id = $(this).val();
                console.log('Vehicle brand id: '+vehicle_brand_id);

                var secondPromise = $.get(fipe_api_base_url+vehicle_type+"/veiculos/"+vehicle_brand_id+".json");
                $.when(secondPromise).done(function(secondData) {
                    // console.log(secondData);
                    secondData.forEach(function(item) {
                        $fts_select_model.append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    });
                });
            });

            $fts_select_model.on('change', function() {
                vehicle_model_key = $(this).val();
                console.log('Vehicle model key: '+vehicle_model_key);

                var thirdPromise = $.get(fipe_api_base_url+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+".json");
                $.when(thirdPromise).done(function(thirdData) {
                    // console.log(thirdData);
                    thirdData.forEach(function(item) {
                        $fts_select_years.append('<option value="'+item.key+'">'+item.name+'</option>');
                    });
                });
            });

            $fts_select_years.on('change', function() {
                vehicle_model_year = $(this).val();
                console.log('Vehicle model year: '+vehicle_model_year);

                var fourthPromise = $.get(fipe_api_base_url+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+"/"+vehicle_model_year+".json");
                $.when(fourthPromise).done(function(fourthData) {
                    // console.log(fourthData);
                    for (var key in fourthData) {
                        if (fourthData.hasOwnProperty(key)) {
                            $('#fts-model-data').append('<p>'+key+": "+fourthData[key]+'</p>');
                        }
                    }

                });
            });
        }

        function init () {
            publicMethod();
        }

        return {
            init: init
        };
    };

    $(function () {
        var module = namespace.subnamespace.Module();
        module.init();
    });

}(window, document, jQuery));
