/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"

solo funciona con letras minusculas
no deben ser utilizados letras con acentos ni caracteres especiales
debe ser posible convertir una palabra para la version encriptada
tambien devolver una palabra encriptada para su version original
d
*/

// valores predefinidos
document.getElementById('con__mensaje').style.display = 'none';
document.getElementById('boton__copiado').style .display = 'none';
document.getElementById('sin__mensaje').style .display = 'block';

//variables
var listaVocales = new Array(2)
listaVocales[0] = new Array(2)
listaVocales[1] = new Array(2)
listaVocales[2] = new Array(2)
listaVocales[3] = new Array(2)
listaVocales[4] = new Array(2)

listaVocales[0][0]="a"
listaVocales[0][1]="ai"
listaVocales[1][0]="e"
listaVocales[1][1]="enter"
listaVocales[2][0]="i"    
listaVocales[2][1]="imes"
listaVocales[3][0]="o"    
listaVocales[3][1]="ober"
listaVocales[4][0]="u"    
listaVocales[4][1]="ufat"

//funcion que hace primeras validaciones del texto recibido
function recibeTextoElemento(parBoton){
    let parTexto = document.getElementById('texto__escrito').value;
    console.log("textoRecibido: " + parTexto)
    
    //variable para validar el texto
    let esValido = true
    //document.getElementById('textoEscrito').value;

    //para validar que el usuario haya escrito el texto
    if (!parTexto){
        //console.log("No se recibio un texto")
        esValido = false
    } else {
        //busca que los caracteres del texto sean validos
        for(var n = 0; n < parTexto.length; n++){
            if(!char(parTexto[n])){
                esValido = false
                break
            }
        }        
    }
    
    // valida el texto escrito
    if (!esValido){
        document.getElementById('sin__mensaje').style.display = "block";
        document.getElementById('con__mensaje').style.display = "none";
        document.getElementById('boton__copiado').style .display = 'none';
        alert('Revise el texto. Contiene caracteres no validos.')
        //console.log("Revise el texto. Contiene caracteres no validos: " + parTexto)
    }else{
        if (parBoton == 1){
            var textoSeguro = encriptar(parTexto)
   
        }else{
            var textoSeguro = desencriptar(parTexto)
 
        }
        document.getElementById('sin__mensaje').style.display = 'none';
        document.getElementById('con__mensaje').style.display = 'block';
        document.getElementById('boton__copiado').style .display = 'block';

        let fraseHTML = document.getElementById("texto__respuesta");
        fraseHTML.innerHTML = textoSeguro

    }    
    return esValido
}


// funcion para validar si el caracter es valido
function char(parChar){
    var alfabeto = [" ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"]
    var rpta = false

    for (var f=0; f < alfabeto.length; f++) {
        if (alfabeto[f] == parChar) {
            rpta = true
            break
        }
    }
    return rpta
}

//funcion para desencriptar la cadena
function desencriptar(parTextoSeguro){
    let arrPalabras = parTextoSeguro.split(" ");
    let nuevaCadena = ""
    let matrizCoincidencias
    let patron = /ai|enter|imes|ober|ufat/g;

    //recorre cada palabra de la frase
    for (var f=0; f < arrPalabras.length; f++) {
        cadena = arrPalabras[f]
        matrizCoincidencias = cadena.match(patron)
        nuevaCadena = cadena
        
        if(matrizCoincidencias != null){
            for (x = 0; x < matrizCoincidencias.length; x++){
                //reemplazando las letras
                for(var j=0; j<listaVocales.length; j++){          
                    //si la letra es una vocal la almacena
                    if (matrizCoincidencias[x] == listaVocales[j][1]){
                        nuevaCadena = cadena.replace(matrizCoincidencias[x], listaVocales[j][0])
                        cadena = nuevaCadena
                        break
                    }
                }
            }
        }
        //reemplaza nueva palabra en matriz
        arrPalabras[f] = nuevaCadena
    }
    // arma frase con nuevas palabras
    nuevaCadena = ""
    for (var f=0; f < arrPalabras.length; f++) {
        nuevaCadena = nuevaCadena + arrPalabras[f] + " "
    }
    return nuevaCadena
}

//funcion para encriptar el texto
function encriptar(parTextoOriginal){
    var cadena = ""
    var vocalAlmacenada = 0

    //recorre cada letra del texto recibido
    for (var f=0; f < parTextoOriginal.length; f++) {
        vocalAlmacenada=0
        // busca el caracter en la funcion de validacion de caracteres
        for(var j=0; j<listaVocales.length; j++){          
            //si la letra es una vocal la almacena
            if (parTextoOriginal[f] == listaVocales[j][0]){
                vocalAlmacenada = j+1
                break
            }            
        }       
        //arma cadena encriptada
        if (vocalAlmacenada > 0) {            
            cadena = cadena + listaVocales[j][1]
        }else{
            cadena = cadena + parTextoOriginal[f]            
        }
    }
    return cadena
}

//funcion de copiado en memoria
function copy(){
    let texto = document.getElementById('texto__respuesta').innerHTML;
    
    try {
        navigator.clipboard.writeText(texto);
        //console.log('Contenido copiado al portapapeles');
        } catch (err) {
        console.error('Error al copiar: ', err);
    }
    console.log('copio: ' + texto);
}
