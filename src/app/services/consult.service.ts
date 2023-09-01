import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ConsultService {
  constructor(private api: ApiService) {}

  getDatosByDni(numdoc: string) {
    return this.api.get('/User/ObtenerDatosPersona?Dni=' + numdoc);
  }
  getDatosPadronSunat(doc: string) {
    return this.api.get('/api/cliente/GetContribuyenteByPadronSunatApi/' + doc);
  }

  buildDatos(fullName: string) {
    const tokens = fullName.trim().split(' ');
    const names: string[] = [];
    const specialTokens = [
      'da',
      'de',
      'del',
      'la',
      'las',
      'los',
      'mac',
      'mc',
      'van',
      'von',
      'y',
      'i',
      'san',
      'santa',
    ];

    let prev = '';
    tokens.forEach((token) => {
      const _token = token.toLowerCase();
      if (specialTokens.includes(_token)) {
        prev += `${token} `;
      } else {
        names.push(prev + token);
        prev = '';
      }
    });

    const numNames = names.length;
    let apellidoPaterno = '';
    let apellidoMaterno = '';
    let nombres = '';

    if (numNames === 1) {
      nombres = names[0];
    } else if (numNames === 2) {
      apellidoPaterno = names[0];
      nombres = names[1];
    } else if (numNames >= 3) {
      apellidoPaterno = names[0];
      apellidoMaterno = names[1];
      nombres = names.slice(2).join(' ');
    }

    apellidoPaterno = apellidoPaterno.replace(/\b\w/g, (c) => c.toUpperCase());
    apellidoMaterno = apellidoMaterno.replace(/\b\w/g, (c) => c.toUpperCase());
    nombres = nombres.replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      NombresUsuario: nombres.trim(),
      ApePatUsuario: apellidoPaterno.trim(),
      ApeMatUsuario: apellidoMaterno.trim(),
    };
  }
}
