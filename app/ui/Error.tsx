// i18n
import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { ErrorProps } from "../interfaces/interfaces";
import { tsx } from "esri/widgets/support/widget";

const CSS = {
    error: "embed-app__layout-error"
}

@subclass("Error")
class Error extends (Widget) {
    constructor(props?: ErrorProps) {
        super(props);
    }
    @property()
    message: string;
    @property()
    title: string;

    render() {
        return (
            <div class={this.classes(CSS.error)}>
                <h1>{this.title}</h1>
                <p>{this.message}</p>
            </div>

        );
    }

}
export default Error;