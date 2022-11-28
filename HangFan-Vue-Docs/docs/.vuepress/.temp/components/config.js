import { defineClientConfig } from "@vuepress/client";
import { h } from "vue";

import { useStyleTag } from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/vueuse.js";
import FontIcon from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import CodePen from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/components/CodePen.js";
import PDF from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";
import BackToTop from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FontIcon", FontIcon);
    app.component("Badge", Badge);
    app.component("CodePen", CodePen);
    app.component("PDF", PDF);
    
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/c/font_3750576_5p09qiy4el.css");`, { id: "icon-assets" });
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});
