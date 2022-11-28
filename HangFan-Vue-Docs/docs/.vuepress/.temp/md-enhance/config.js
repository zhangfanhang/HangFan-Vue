import { defineClientConfig } from "@vuepress/client";
import CodeTabs from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import CodeDemo from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-title.scss";
import Tabs from "/Users/zfh/my-projects/HangFan-Vue/HangFan-Vue-Docs/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("CodeDemo", CodeDemo);
    app.component("Tabs", Tabs);
    
  },
});
