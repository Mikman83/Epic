import $ from 'jquery'
import 'select2'
import 'select2/dist/css/select2.css'

$(() => {
    $('.j-select2').select2({
        minimumResultsForSearch: Infinity // disable searching
    });
});
