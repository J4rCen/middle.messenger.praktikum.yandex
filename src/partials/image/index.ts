import template from "./image.hbs";
import Block from "../../utils/Block";

interface ImageProps {
    class: string;
    src: string;
    alt: string;
    onClick?: () => void;
    events: {
        click: () => void; 
    }
}

export default class Image extends Block {
    constructor(props: ImageProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
