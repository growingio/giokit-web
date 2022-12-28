import { isEmpty, isString, keys, startsWith } from '@/utils/glodash';

export const startTemplate = `<!-- GrowingIO Analytics WebJS SDK version 3.8 -->
<!-- Copyright 2015-2022 GrowingIO, Inc. More info available at http://www.growingio.com -->`;

// 生成cdn插件引入代码
export const generateCDNPluginsImport = (options: any) => {
  const plugins = keys(options).filter(
    (k) => options[k] && startsWith(k, 'gio')
  );
  const imports = plugins.map(
    (k) =>
      `<script src="https://assets.giocdn.com/sdk/webjs/cdp/plugins/${k}.js"></script>`
  );
  return imports.join('\n');
};

// 生成npm插件引入代码
export const generateNPMPluginsImport = (options: any) => {
  const plugins = keys(options).filter(
    (k) => options[k] && startsWith(k, 'gio')
  );
  const imports = plugins.map((k) => {
    return `import ${k} from "gio-webjs-sdk-cdp/plugins/${k}";`;
  });
  return imports.join('\n');
};

// 按需集成模版
export const fullTemplate = `<script type="text/javascript">
  !(function (e, n, t, c, i) {
    (e[i] =
      e[i] ||
      function () {
        (e[i].q = e[i].q || []).push(arguments);
      }),
      (t = n.createElement('script'));
    s = n.getElementsByTagName('script')[0];
    (t.async = 1), (t.src = c), s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://assets.giocdn.com/sdk/webjs/cdp/gdp-full.js', 'gdp');`;

// 按需集成模版
export const demandedTemplate = `<script type="text/javascript">
  !(function (e, n, t, c, i) {
    (e[i] =
      e[i] ||
      function () {
        (e[i].q = e[i].q || []).push(arguments);
      }),
      (t = n.createElement('script'));
    s = n.getElementsByTagName('script')[0];
    (t.async = 1), (t.src = c), s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://assets.giocdn.com/sdk/webjs/cdp/gdp.js', 'gdp');`;

// 生成npm引入代码
export const generateNPMImport = (full: boolean = false) =>
  full
    ? `import gdp from 'gio-webjs-sdk-cdp/gdp-full';\n`
    : `import gdp from 'gio-webjs-sdk-cdp';\n`;

// 生成插件注册代码
export const generatePluginsRegister = (
  options: any,
  integrationMode: string
) => {
  const plugins = keys(options).filter(
    (k) => options[k] && startsWith(k, 'gio')
  );
  if (!isEmpty(plugins)) {
    return `
${integrationMode === 'cdn' ? '  ' : ''}gdp('registerPlugins', [${
      plugins.length >= 3 ? '\n  ' : ''
    }${
      plugins.length >= 3 && integrationMode === 'cdn' ? '  ' : ''
    }${plugins.join(
      ',' +
        (plugins.length >= 3 ? '\n  ' : ' ') +
        (plugins.length >= 3 && integrationMode === 'cdn' ? '  ' : '')
    )}${plugins.length >= 3 ? '\n' : ''}${
      plugins.length >= 3 && integrationMode === 'cdn' ? '  ' : ''
    }]);
`;
  } else {
    return '';
  }
};

const configNames = [
  'autotrack',
  'compress',
  'debug',
  'enableIdMapping',
  'hashtag',
  'host',
  'scheme',
  'version'
];
// 生成初始化代码
export const generateInit = (options: any, integrationMode: string) => {
  const idConfigs = [`'${options.projectId}'`, `'${options.dataSourceId}'`];
  if (options.appId) {
    idConfigs.push(`'${options.appId}'`);
  }
  const configs: string[] = [];
  configNames.forEach((k, i) => {
    if (options[k]) {
      configs.push(
        `${integrationMode === 'cdn' ? '  ' : ''}${k}: ${
          isString(options[k]) ? "'" : ''
        }${options[k]}${isString(options[k]) ? "'" : ''}`
      );
    }
  });
  return `${integrationMode === 'cdn' ? '  ' : ''}gdp('init', ${idConfigs.join(
    ', '
  )}, {
  ${configs.join(',\n  ')}
${integrationMode === 'cdn' ? '  ' : ''}});`;
};

// 结尾模版
export const endTemplate = `</script>`;
