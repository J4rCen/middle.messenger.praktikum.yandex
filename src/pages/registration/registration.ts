export default 
`
<div>
    {{#card}}
            <div class="login-form__buttons-selection display_flex">
                {{#each buttons}}
                    {{{button class=this.class label=this.label type=../type onClick=this.onClick}}}
                {{/each}}
            </div>
            {{{FormRegistration}}}
    {{/card}}
</div>
`
