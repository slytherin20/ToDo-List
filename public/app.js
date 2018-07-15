

let todolist=[];
window.localStorage;
$(document).ready(function() {
    let inp = $('#ip');
    let disp = $('#disp');
    let btn = $('#btn');

    display();
    btn.click(function () {
        makeRequest();
    });


    function makeRequest() {
        let obj = {
            "task": inp.val()
        };
        $.ajax({
            url: '/add',
            method: 'post',
            data: {todo: obj},
            success: function () {
                todolist.push(obj);
               localStorage.setItem('todo', JSON.stringify(todolist));
                disp.append(`<li><input type="hidden">
<span onclick="updateText(this)" class="text-box">${obj.task}</span>
                    <span onclick="deleteKey(this)"><img src="https://i.imgur.com/VFTSar0.png"></span>
                    <span onclick="updateKey(this)"><img src="https://i.imgur.com/iWiZf5c.png"></span>
                    </li>`);

            }
        });
    }

    function display() {
        let data = JSON.parse(localStorage.getItem('todo')) || [];
        if (data.length) {
            render(data);
            todolist = data;
        }
        else {

            $.ajax({
                url: '/display',
                method: 'GET',
                success: function (data) {
                    localStorage.setItem('todo', JSON.stringify(data));
                    render(data);
                    todolist = data;

                }

            });
        }
    }

    function render(data) {
        data.forEach(function(value) {
            disp.append(`<li><input type="hidden">
<span onclick="updateText(this)" class="text-box">${value.task}</span>
                  <span onclick="deleteKey(this)"><img src="https://i.imgur.com/VFTSar0.png"></span>
                  <span onclick="updateKey(this)"><img src="https://i.imgur.com/iWiZf5c.png"></span>
                  </li>`);
        });
    }

});
    function deleteKey(element) {
        let index = $(element).parent().index();
        let text=$(element).prev().text();
        $.ajax({
            url: '/delete',
            method: 'post',
            data: {task: text},
            success: function () {
                $(element).parent().remove();
                todolist.splice(index,1);
                localStorage.setItem('todo', JSON.stringify(todolist));
            }

        });

    }

    function updateText(element) {
        $(element).prev().attr("type", "text");
        $(element).css("display", "none");

    }

    function updateKey(element) {
        let index = $(element).parent().index();
        let value = $(element).prev().prev().prev().val();
        let oldtodo=$(element).prev().prev().text();
        if(value){
            $.ajax({
                url: '/update',
                method: 'post',
                data: {newtask:value, oldtask:oldtodo},
                success: function () {
                    $(element).prev().prev().prev().attr("type", "hidden");
                    $(element).prev().prev().css("display", "inline-block");
                    $(element).prev().prev().text(value);
                    todolist[index].task=value;

                    localStorage.setItem('todo', JSON.stringify(todolist));

                }
            });
        }
        else{
            $(element).prev().prev().prev().attr("type", "hidden");
            $(element).prev().prev().css("display", "inline-block");
            $(element).prev().prev().text(oldtodo);
        }



    }

