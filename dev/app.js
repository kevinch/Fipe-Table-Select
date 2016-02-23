/*global window, document, jQuery, namespace, subnamespace*/
window.namespace = window.namespace || {};
namespace.subnamespace = namespace.subnamespace || {};

(function (window, document, $) {
    'use strict';

    namespace.subnamespace.Module = function () {
        var vehicle_type,
            vehicle_brand_id,
            vehicle_model_key,
            vehicle_model_year;

        // function getBrands (type) {
        //     var jqxhr = $.getJSON( "http://fipeapi.appspot.com/api/1/carros/marcas.json", function(data) {
        //         console.log( "success" );
        //         return data;
        //     })
        //     .done(function() {
        //         console.log( "done" );
        //     })
        //     .fail(function() {
        //         console.log( "error" );
        //     })
        //     .always(function() {
        //         console.log( "complete" );
        //     });
        // }

        function publicMethod () {
            $('#fts-select-type').on('change', function() {
                vehicle_type = $(this).val();
                console.log('Vehicle type: '+vehicle_type);

                var firstPromise = $.get("http://fipeapi.appspot.com/api/1/"+vehicle_type+"/marcas.json");
                $.when(firstPromise).done(function(firstData) {
                    firstData.forEach(function(item) {
                        $('#fts-select-brand').append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    });
                });
            });

            $('#fts-select-brand').on('change', function() {
                vehicle_brand_id = $(this).val();
                console.log('Vehicle brand id: '+vehicle_brand_id);

                var secondPromise = $.get("http://fipeapi.appspot.com/api/1/"+vehicle_type+"/veiculos/"+vehicle_brand_id+".json");
                $.when(secondPromise).done(function(secondData) {
                    // console.log(secondData);
                    secondData.forEach(function(item) {
                        $('#fts-select-model').append('<option value="'+item.id+'">'+item.fipe_name+'</option>');
                    });
                });
            });

            $('#fts-select-model').on('change', function() {
                vehicle_model_key = $(this).val();
                console.log('Vehicle model key: '+vehicle_model_key);

                var thirdPromise = $.get("http://fipeapi.appspot.com/api/1/"+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+".json");
                $.when(thirdPromise).done(function(thirdData) {
                    // console.log(thirdData);
                    thirdData.forEach(function(item) {
                        $('#fts-select-years').append('<option value="'+item.key+'">'+item.name+'</option>');
                    });
                });
            });

            $('#fts-select-years').on('change', function() {
                vehicle_model_year = $(this).val();
                console.log('Vehicle model year: '+vehicle_model_year);

                var fourthPromise = $.get("http://fipeapi.appspot.com/api/1/"+vehicle_type+"/veiculo/"+vehicle_brand_id+"/"+vehicle_model_key+"/"+vehicle_model_year+".json");
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
            //publicMethod : publicMethod,
            init: init
        };
    };

    $(function () {
        var module = namespace.subnamespace.Module();
        module.init();
    });

}(window, document, jQuery));
