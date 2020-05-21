export const db ={
    set : async(key:string,value:any) => {
        try {
          value = JSON.stringify(value);
          return await window.localStorage.setItem(key, value);
        } catch (error) {
          throw 'Can\'t store data';
        }
    },
    get : async(key:string) => {
        try {
            let value :string | null= await window.localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            throw 'Can\'t retrieve data';
          }
    }
}
