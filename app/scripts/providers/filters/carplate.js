(() => {
    app.filter('carplate', function() {
        return function(input) {
            let begin = input.substring(0, 3);
            let rest = input.substring(3);
            return ((rest.indexOf('-') !== -1) ? begin + rest : begin + '-' + rest).toUpperCase();
        };
    });
})();