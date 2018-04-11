$(function() {
    let roomId;

    $.ajax({
        type: 'GET',
        url: '/api/rooms',
        success: rooms => {
            roomId = rooms[0].id;
            getMessages();
            $.each(rooms, (key, room) => {
                const a = `<a href='#' data-room-id='${room.id}' class='room list-group-item'>${room.name}</a>`;
                $('#rooms').append(a);
            });
        }
    });

    $('#post').click(() => {
        const message = { text: $('#message').val() };

        $.ajax({
            type: 'POST',
            url: `/api/rooms/${roomId}/messages`,
            data: JSON.stringify(message),
            contentType: 'application/json',
            success: () => {
                $('#message').val('');
                getMessages();
            }
        });
    });

    $('body').on('click', 'a.room', event => {
        roomId = $(event.target).attr('data-room-id');
        getMessages();
    });

    const getMessages = () => {
        $.ajax({
            type: 'GET',
            url: `/api/rooms/${roomId}/messages`,
            success: data => {
                $('#roomName').text(`Messages for ${data.room.name}`);
                let messages = '';
                $.each(data.messages, (key, message) => {
                    messages += `${message.text}\r`;
                });
                $('#messages').val(messages);
            }
        });
    };

    $('#delete').click(() => {
        $.ajax({
            type: 'DELETE',
            url: `/api/rooms/${roomId}/messages`,
            success: () => {
                $('#messages').val('');
            }
        });
    });
});
