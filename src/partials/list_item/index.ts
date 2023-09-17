import Block from "../../utils/Block";
import template from "./list_item.hbs";

interface ListItemProps {
    class: string;
    label: string;
    events?: {
        click: () => void;
    }
}


export default class ListItem extends Block {
    constructor(props: ListItemProps) {
        super({...props})
    }

    render() {
        return this.compile(template, this.props)
    }
} 
