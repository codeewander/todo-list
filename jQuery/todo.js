$(document).ready(function () {
    //監聽事件
    $('#addItem').on('click', addItem)
    $('#newTodo').on('keypress', function (event) {
        //Enter監聽事件
        if (event.keyCode === 13) {
            addItem()
            event.preventDefault()
        }
    })

    //function: 增加任務
    function addItem(event) {
        //取得輸入的文字
        const newTodoText = $('#newTodo').val()
        const template = `
        <li class="item">
           <input class="completeItem" type="checkbox">
           <span class="todoText">${newTodoText}</span>
           <input class="editText type="text">
           <button class="saveItem">save</button>
           <button class="fa fa-trash deleteItem" type="button"></button>
        </li>`
        //將template包成jQuery可以處理的狀態
        const jQueryTemplate = $(template)
        $('#todos').append(jQueryTemplate)
        //在新增的任務上加上監聽器
        jQueryTemplate.find('.deleteItem').on('click', deleteItem)
        jQueryTemplate.find('.todoText').on('click', editItem)
        jQueryTemplate.find('.saveItem').on('click', stopEdit)
        jQueryTemplate.find('.completeItem').on('click', completeItem)
    }

    //function: 刪除任務
    function deleteItem() {
        $(this).parent().remove()
    }

    //function : 完成任務
    function completeItem() {
        $(this).parent().find('.todoText').toggleClass('done')
    }

    //function: 編輯任務
    function editItem() {
        const item = $(this).parent()
        //取得點擊到的todoText
        let currentText = item.find('.todoText').text()
        //將todoText文字放入編輯框，並顯示編輯框
        item.find('.editText').val(currentText).show()
        //save按鈕顯示出來
        item.find('.saveItem').show()
        //舊的todoText隱藏
        item.find('.todoText').hide()
    }

    //funtion : 停止編輯
    function stopEdit() {
        const item = $(this).parent()
        //save按鈕隱藏
        $(this).hide();
        //編輯框隱藏
        item.find('.editText').hide()
        //取得編輯後的值，並放到todoText
        const newText = item.find('.editText').val();
        item.find('.todoText').text(newText)
        //顯示todoText
        item.find('.todoText').show()
    }
})


//另一種解法: 事件委派


// $(document).ready(function () {

//     // 監聽事件
//     $('#addItem').on('click', addItem)
//     $('#todos').on('change', '.completeItem', completeItem)
//     $('#todos').on('click', '.deleteItem', deleteItem)
//     $('#todos').on('click', '.todoText', editItem)
//     $('#todos').on('click', '.saveItem', stopEdit)
//     $('#newTodo').on('keypress', function (event) {
//         //Enter鍵監聽
//         if (event.keyCode === 13) {
//             addItem()
//             event.preventDefault()
//         }
//     })

//     function addItem() {
//         //取得輸入的文字
//         var newTodoText = $('#newTodo').val()
//         $('#todos').append(
//             `<li>
//                 <input class="completeItem" type="checkbox">
//                 <span class="todoText">${newTodoText}</span>
//                 <input class="editText type="text">
//                 <button class="saveItem">save</button>
//                 <button class="fa fa-trash deleteItem" type="button"></button>
//              </li> 
//             `)
//         $('#newTodo').val("")
//     }

//     function editItem(event) {
//         var taskLi = $(this).parent()
//         //取得點擊到的todoText
//         let currentText = taskLi.find('.todoText').text()
//         //將todoText文字放入編輯框，並顯示編輯框
//         taskLi.find('.editText').val(currentText).show()
//         //save按鈕顯示出來
//         taskLi.find('.saveItem').show()
//         //舊的todoText隱藏
//         taskLi.find('.todoText').hide()
//     }
//     function stopEdit(event) {
//         var taskLi = $(this).parent()
//         //save按鈕隱藏
//         $(this).hide();
//         //編輯框隱藏
//         taskLi.find('.editText').hide()
//         //取得編輯後的值，並放到todoText
//         var newText = taskLi.find('.editText').val();
//         taskLi.find('.todoText').text(newText)
//         //顯示todoText
//         taskLi.find('.todoText').show()

//     }

//     function deleteItem(event) {
//         $(this).parent().remove()
//     }
//     function completeItem(event) {
//         $(this).parent().find('.todoText').toggleClass('done')
//     }
// })