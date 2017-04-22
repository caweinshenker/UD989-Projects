/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = {
                'attendance': [],
                'missing' : 0
            };

            for (var i = 0; i <= 11; i++) {
                var attended = getRandom();
                attendance[name]["attendance"].push(attended);
                attendance[name]['missing'] += attended;
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */



var model = {

    init: function(){
        this.attendance = {};
        var attendance = JSON.parse(localStorage.attendance);
        for (var student in attendance){
                this.attendance[student] = {
                    'attendance': attendance[student]["attendance"],
                    'missing': attendance[student]["missing"]
            };
        }
    },

    get_records: function(){
        return this.attendance;
    },

    get_record: function(name){
        return this.attendance[name];
    },

    update_record: function(name, date){
        var attended = this.attendance[name]["attendance"][date];
        this.attendance[name]["attendance"][date] = !attended;
        this.attendance[name]["missing"] += (attended ? -1 : 1);
        localStorage.attendance = JSON.stringify(this.attendance);
    }

};


var octopus = {

    init: function(){
        model.init();
        view.init();
    },

    get_records: function(){
        return model.get_records();
    },

    get_record: function(name){
        return model.get_record(name);
    },

    update_record: function(name, date){
        model.update_record(name, date);
    }
}


var view = {

    init: function(){
            this.$Checkboxes = $('tbody input');
            this.update_student_rows();
            this.$Checkboxes.each(function(){
                    $(this).on('click', function(){
                        var name = $(this).parent().parent().children('.name-col').text();
                        console.log(name);
                        var date = $(this).parent().parent().children().index($(this).parent()) - 1;
                        console.log(date);
                        octopus.update_record(name, date);
                        view.update_student_row(name);
                    });
            });
        },

    update_student_row: function(name){
        var record = octopus.get_record(name);
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr');
        var missedRecord = studentRow.children('.missed-col');
        var dayChecks = $(studentRow).children('.attend-col').children('input');
        missedRecord.text(record["missing"]);
        dayChecks.each(function(i) {
            $(this).prop('checked', record["attendance"][i]);
        });

    },

    update_student_rows: function(){
        var records = octopus.get_records();
        for (var name in records){
            this.update_student_row(name);
        }
    }
}

octopus.init();
