import yamlConfig from 'node-yaml-config';

class ConfigLoader {

  constructor(configFile){
    this.configFile = configFile;
  }

  load(){
    let config = yamlConfig.load(this.configFile);
    return config;
  }
}

export default ConfigLoader;



