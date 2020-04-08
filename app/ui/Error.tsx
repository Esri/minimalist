/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/*
  Copyright 2020 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/
import { declared, subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { ErrorProps } from "../interfaces/interfaces";
import { tsx } from "esri/widgets/support/widget";

const CSS = {
    error: "embed-app__layout-error"
}

@subclass("Error")
class Error extends declared(Widget) {
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