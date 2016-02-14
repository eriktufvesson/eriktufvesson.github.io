import {Injectable, Pipe} from 'angular2/core';

/*
  Generated class for the Filter pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
    name: 'filter'
})
@Injectable()
export class Filter {
    /*
      Takes a value and makes it lowercase.
     */
    transform(values, args) {
        let key = args && args.length > 0 ? args[0] : null;
        let value = args && args.length >= 1 ? args[1] : null;
        let limitTo = args && args.length >= 2 ? args[2] : null;

        if (values) {
            let result = values.filter((item) => item[key] === value);

            if (limitTo) {
                result = result.slice(0, limitTo);
            }

            return result;
        }
        return null;
    }
}
