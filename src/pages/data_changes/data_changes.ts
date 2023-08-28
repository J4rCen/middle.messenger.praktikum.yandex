export default
`
<div>
{{#page}}
    {{#menu}}

        <div class="menu__title_profile">
            <figure class="context-profile__figure">
                {{#imgBackward}}
                    {{{image class=this.class src=this.src alt=this.alt onClick=this.onClick}}}
                {{/imgBackward}}
            </figure>
            <p class="menu__title_profile__section_titles">Профиль</p>
        </div>

        <div class="profile__information">
        
            {{{FormChangeData}}}

        </div>

    {{/ menu}}
    {{{ChatPage}}}
    {{/page}}
</div
`
