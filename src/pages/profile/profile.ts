export default 
`
{{#page}}
{{#menu}}
    <div>
        <div class="menu__title_profile">
            <figure class="context-profile__figure">
            {{#imgBackward}}
                {{{image class=this.class src=this.src alt=this.alt onClick=this.onClick}}}
            {{/imgBackward}}
            </figure>
            <p class="menu__title_profile__section_titles">Профиль</p>
        </div>

        <div class="profile__information">
            <div class="profile__information__avatar">
                <figure class="profile__figure__avatar">
                    <img class="profile__img__avatar" src="" alt="">
                </figure>    
            </div>


            {{#each profileInformation}}
                {{{ProfileInformation class=this.class descriptions=this.descriptions information=this.information}}}
            {{/each}}
            
            <div class="profile__buttons">
            {{#each buttonProfileChange}}
                {{{button class=this.class label=this.label onClick=this.onClick}}}
            {{/each}}
            </div>
        </div>
    </div>
    {{/ menu}}
    {{{ChatPage}}}
    {{/page}}
`
