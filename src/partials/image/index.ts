import template from "./image.hbs";
import Block from "../../utils/Block";

interface ImageProps {
    class?: string;
    src?: string;
    alt?: string;
    events?: {
        click: () => void; 
    }
}

export default class Image extends Block {
    constructor(props: ImageProps) {
        super({...props})
    }

    render() {
        return this.compile(template, this.props);
    }
}
