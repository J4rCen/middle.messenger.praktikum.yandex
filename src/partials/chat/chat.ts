export default 
`
<div class="main__chat">
    <div class="main__chat_upmenu bg_color_212A35">
        <div class="main__chat_upmenu__info_frend flex_center">
            <figure class="main__chat_upmenu__info_frend__figure">
                <img src="" alt="Аватарка друга" class="main__chat_upmenu__info_frend_image">
            </figure>

            <p class="main__chat_upmenu__info_frend_name text_color_white">Frend</p>
        </div>
    </div>

    <div class="main__chat_message_area">
        <div class="main__chat_message_area__flex">
        {{#each messagesPage}}
            {{{message type=this.type messag=this.messag}}}
        {{/each}}
        </div>
    </div>

    <div class="main__chat_downmenu bg_color_212A35 flex_center">

        {{{FormSendingMessage}}}

    </div>
</div>
`
