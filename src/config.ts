type ConfigChangeEvent = (value: string | undefined) => void;

// A group of callbacks that be invoked in mass
class Delegate<T extends (...args: any[]) => void> {
    nextId = 0;
    callbacks: Map<number, T> = new Map();
    
    // Add a callback
    add(callback: T) {
        this.callbacks.set(this.nextId, callback);
        return this.nextId++;
    }
    
    // Remove a callback
    remove(id: number) {
        this.callbacks.delete(id);
    }
    
    // Invoke a callback
    invoke(...args: any[]) {
        for(const [,cb] of this.callbacks) {
            cb(...args);
        }
    }
}

export class Config {
    private prefix = "sending-stones-";
    private settings: Map<string, string> = new Map();
    private delegates: Map<string, Delegate<ConfigChangeEvent>> = new Map();
    
    constructor() {
        this.load();
    }
    
    // load configuration from storage
    load() {
        const keys = [
            "windowSize",
            "suppressRolls"
        ];
        
        const kv = keys.map((k) =>  <[string, string]>[
            k,
            window.localStorage.getItem(this.prefix + k) || ""
        ]);
        
        this.settings = new Map(kv);
    }
    
    // save configuration to storage
    save() {
        for(const [key, value] of this.settings) {
            window.localStorage.setItem(this.prefix + key, value);
        }
    }
    
    // retrieve a configuration value
    get(key: string) : string | undefined {
        return this.settings.get(key);
    }
    
    // set a configuration value
    set(key: string, value: string) {
        if(this.settings.get(key) == value) return;
        this.settings.set(key, value);
        this.save();
        
        const delegate = this.delegates.get(key);
        if(!delegate) return;
        delegate.invoke(value)
    }
    
    /*
     * Registers a callback to be called when the value stored at key changes
     * @returns react-style unregister callback
     */
    onChange(key: string, callback: ConfigChangeEvent): () => void {
        let delegate = this.delegates.get(key);
        if(!delegate) {
            delegate = new Delegate<ConfigChangeEvent>();
            this.delegates.set(key, delegate);
        }
        const id = delegate.add(callback);
        return () => {
            delegate?.remove(id);
        }
    }
    
    private static instance: Config;
    // Get static Config instance, instantiating it if necessary
    static getInstance() {
        if(Config.instance) return Config.instance;
        Config.instance = new Config();
        return Config.instance;
    }

    static get(key: string) {
        return Config.getInstance().get(key);
    }

    static set(key: string, value: string) {
        return Config.getInstance().set(key, value);
    }
}

/*
 * Registers a callback to be called when the value stored at key changes
 * @returns react-style unregister callback
 */
export function onConfigChange(key: string, callback: ConfigChangeEvent) : () => void {
    const config = Config.getInstance();
    callback(config.get(key));
    return config.onChange(key, callback);
}