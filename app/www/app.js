window.namespace = window.namespace || {};
namespace.subnamespace = namespace.subnamespace || {};

(function (window, document, $) {
    'use strict';

    namespace.subnamespace.Module = function () {
        var vehicle_type,
            vehicle_brand_id,
            vehicle_model_key,
            vehicle_model_year,
            itemsProcessed,
            promise;

        var $fts_select_type  = $('#fts-select-type'),
            $fts_select_brand = $('#fts-select-brand'),
            $fts_select_model = $('#fts-select-model'),
            $fts_select_years = $('#fts-select-years'),
            $fts_model_data   = $('#fts-model-data');

        var fipe_api_base_url = "http://fipeapi.appspot.com/api/1/";

        function getBrands(type) {
            promise = $.get(fipe_api_base_url+type+"/marcas.json");
            $.when(promise).done(function(data) {
                itemsProcessed = 0;

                data.forEach(function(item) {
                    $fts_select_brand.append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    itemsProcessed++;
                });

                if(itemsProcessed === data.length) {
                    $fts_select_brand.prop("disabled", false);
                }
            });
        }

        function getModels() {
            promise = $.get(fipe_api_base_url+vehicle_type+"/veiculos/"+vehicle_brand_id+".json");
            $.when(promise).done(function(data) {
                itemsProcessed = 0;

                data.forEach(function(item) {
                    $fts_select_model.append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    itemsProcessed++;
                });

                if(itemsProcessed === data.length) {
                    $fts_select_model.prop("disabled", false);
                }
            });
        }

        function getYears() {
            promise = $.get(fipe_api_base_url+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+".json");
            $.when(promise).done(function(data) {
                itemsProcessed = 0;

                data.forEach(function(item) {
                    $fts_select_years.append('<option value="'+item.key+'">'+item.name+'</option>');
                    itemsProcessed++;
                });

                if(itemsProcessed === data.length) {
                    $fts_select_years.prop("disabled", false);
                }
            });
        }

        function getFinalData() {
            promise = $.get(fipe_api_base_url+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+"/"+vehicle_model_year+".json");
            $.when(promise).done(function(data) {
                console.log(data); //final data
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        $('#fts-model-data').append('<p>'+key+": "+data[key]+'</p>');
                    }
                }
            });
        }

        function publicMethod () {

            $fts_select_type.on('change', function() {
                // get selected type
                vehicle_type = $(this).val();
                // debug
                console.log('Vehicle type: '+vehicle_type);
                // retrieve brands
                getBrands(vehicle_type);
            });

            $fts_select_brand.on('change', function() {
                // get brand id
                vehicle_brand_id = $(this).val();
                // debug
                console.log('Vehicle brand id: '+vehicle_brand_id);
                // retrieve models
                getModels();
            });

            $fts_select_model.on('change', function() {
                // get model key
                vehicle_model_key = $(this).val();
                // debug
                console.log('Vehicle model key: '+vehicle_model_key);
                // retrieve years
                getYears();
            });

            $fts_select_years.on('change', function() {
                // get year
                vehicle_model_year = $(this).val();
                // debug
                console.log('Vehicle model year: '+vehicle_model_year);
                // retrieve final data
                getFinalData();
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
