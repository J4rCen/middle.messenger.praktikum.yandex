export default 
`
<div>
{{#page}}
    {{#menu}}

    <nav class="menu__contex-menu disabled">
        <ul class="context-menu__list">
        {{#each menuList}}
            {{{listItem class=this.class label=this.label onClick=this.onClick}}}
        {{/each}}
        </ul>
    </nav>

    <div class="menu__search-menu">
        <figure class="context-menu__figure">
        {{#btnImgMenu}}
            {{{image class=this.class src=this.src alt="context-menu" onClick=this.onClick}}}
        {{/btnImgMenu}}
        </figure>
        {{{input class="text-input search-menu" placeholder="Поиск"}}}
    </div>

    <div class="menu__friend_list">
        {{{friend login_friend="Ivan" message_friend="Hello" message_date="ср" missed_quantity="1"}}}
        {{{friend login_friend="Ivan" message_friend="Hello" message_date="ср" missed_quantity="1"}}}
        {{{friend login_friend="Ivan" message_friend="Hello" message_date="ср" missed_quantity="1"}}}
    </div>

    {{/menu}}

    {{{ChatPage}}}
    
    {{/page}}
</div>

`
