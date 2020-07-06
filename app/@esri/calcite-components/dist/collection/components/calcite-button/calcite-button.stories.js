import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import {
  darkBackground,
  iconNames,
  parseReadme
} from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-button
      appearance="${select(
        "appearance",
        ["solid", "clear", "outline", "transparent"],
        "solid"
      )}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
      round="${boolean("round", false)}"
      floating="${boolean("floating", false)}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
   ${text("text", "button text here")}
    </calcite-button>
  `,
    { notes }
  )
  .add(
    "With icon",
    () => `
    <calcite-button
      appearance="${select(
        "appearance",
        ["solid", "clear", "outline", "transparent"],
        "solid"
      )}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
      round="${boolean("round", false)}"
      floating="${boolean("floating", false)}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
      icon="${select("icon", iconNames, iconNames[0])}"
      icon-position="${select("icon-position", ["start", "end"], "start")}">
      ${text("text", "button text here")}
    </calcite-button>
  `,
    { notes }
  )
  .add(
    "Set width container",
    () => `
    <div style="width: 480px; max-width: 100%; background-color: #fff">
      <calcite-button
        width="${select("width", ["auto", "half", "full"], "auto")}"
        icon="${select("icon", iconNames, iconNames[0])}"
        icon-position="${select("icon-position", ["start", "end"], "start")}">
        ${text("text", "button text here")}
      </calcite-button>
    </div>
  `,
    { notes }
  )
  .add(
    "Side by side",
    () => `
    <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
    width="half"
    appearance="${select(
      "appearance",
      ["solid", "clear", "outline", "transparent"],
      "outline"
    )}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}">
    ${text("text", "Back")}
    </calcite-button>
    <calcite-button
    width="half"
    appearance="${select(
      "appearance-2",
      ["solid", "clear", "outline", "transparent"],
      "solid"
    )}"
    color="${select("color-2", ["blue", "red", "dark", "light"], "blue")}"
    icon="${select("icon", iconNames, iconNames[0])}">
    ${text("text-2", "Some long string")}
    </calcite-button>
  </div>
  `,
    { notes }
  )
  .add(
    "FAB",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #c9c9c9;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  id="calcite-fab-tooltip"
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select("width", ["auto", "half", "full"], "auto")}"
  icon="${select("icon", iconNames, iconNames[0])}"
  appearance="${select("appearance", ["solid", "outline"], "solid")}"
  color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
  scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"></calcite-button>
  </div>
</div>
<calcite-tooltip reference-element="calcite-fab-tooltip">Add new</calcite-tooltip>

`,
    { notes }
  )
  .add(
    "FAB with text",
    () => `
  <div
    style="height:300px;width:200px;border:1px solid #c9c9c9;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
    semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
    volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
    lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
    massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
    maximus consequat.

    Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
    mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
    odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
    malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
    pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
    quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
    ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
    libero aliquam, imperdiet ipsum sed, volutpat nisl.

    <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
    <calcite-button
    round="${boolean("round", true)}"
    floating="${boolean("floating", true)}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    icon="${select("icon", iconNames, iconNames[0])}"
    appearance="${select("appearance", ["solid", "outline"], "solid")}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}">
    ${text("text", "button text here")}
  </calcite-button>
  </div>
</div>
`,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-button
    theme="dark"
    appearance="${select(
      "appearance",
      ["solid", "clear", "outline", "transparent"],
      "solid"
    )}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    round="${boolean("round", false)}"
    floating="${boolean("floating", false)}"
    href="${text("href", "")}"
    loading="${boolean("loading", false)}"
    disabled="${boolean("disabled", false)}"
    icon="${select("icon", iconNames, iconNames[0])}">
    ${text("text", "button text here")}
  </calcite-button>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "FAB - dark mode",
    () => `
  <div
    style="height:300px;width:200px;border:1px solid #555;color: #eaeaea;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
    semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
    volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
    lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
    massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
    maximus consequat.

    Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
    mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
    odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
    malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
    pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
    quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
    ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
    libero aliquam, imperdiet ipsum sed, volutpat nisl.

    <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
    <calcite-button
    theme="dark"
    id="calcite-fab-tooltip"
    round="${boolean("round", true)}"
    floating="${boolean("floating", true)}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    icon="${select("icon", iconNames, iconNames[0])}"
    appearance="${select("appearance", ["solid", "outline"], "solid")}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"></calcite-button>
  </div>
</div>
<calcite-tooltip theme="dark" reference-element="calcite-fab-tooltip">Add new</calcite-tooltip>
`,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "FAB with text - dark mode",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #555;color: #eaeaea;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  theme="dark"
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select("width", ["auto", "half", "full"], "auto")}"
  icon="${select("icon", iconNames, iconNames[0])}"
  appearance="${select("appearance", ["solid", "outline"], "solid")}"
  color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
  scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}">
  ${text("text", "button text here")}</calcite-button>
  </div>
</div>
`,
    { notes, backgrounds: darkBackground }
  );
