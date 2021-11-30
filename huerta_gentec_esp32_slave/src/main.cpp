#include <Arduino.h>
#include <EEPROM.h>
#include <BluetoothSerial.h>
#include <FirebaseESP32.h>
#include <WiFi.h>
#include <DHT.h>

//ESTADOS{
int estado = 0;

#define UNCON 0
#define CON_FIRECON 1
#define CON_FIREUNCON 2
//ESTADOS}

//OBJETOS
BluetoothSerial SerialBT;
FirebaseData fbdo;
DHT dht22(5, DHT22);

#define RELE 18

//Firebase
#define DB_URL "https://huerta-hidro---gentec-default-rtdb.firebaseio.com/"
#define DB_SECRET "l5N7np92G7VzBbuGeZFA6ICqXd8yz8YIoYVu1JC3"

#define EEPROM_SIZE 512
#define MARGEN 3

String SSID = "-";
String PASS = "-";
String ruta_fire = "-";
String inst = "-";

int address, ad_aux = 0;
float temp, hum;
bool btEn, instChanged, SSID_select, PASS_select, SSID_changed, PASS_changed = false;

void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);
  dht22.begin();

  SSID = EEPROM.readString(address);
  address += (SSID.length()+1);

  if(SSID != "-"){
    PASS = EEPROM.readString(address);
    address += (PASS.length()+1);
    //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
    char SSID_c[SSID.length()];
    for (int i = 0; i < SSID.length()+1; i++) {
        SSID_c[i] = SSID[i];
    }
    char PASS_c[PASS.length()];
    for (int i = 0; i < PASS.length()+1; i++) {
        PASS_c[i] = PASS[i];
    }
    //FIN DE CONVERSIÓN
    WiFi.begin(SSID_c, PASS_c);
    Serial.print(SSID);
    Serial.println(PASS);
    long aux = millis();
    while(WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      if(millis()-aux > 20000) break;
      delay(1000);
    }
   
    if(WiFi.status() != WL_CONNECTED) estado=UNCON;
    else if(EEPROM.readString(address) == "-") estado=CON_FIREUNCON;
    else{
      estado=CON_FIRECON;
      ruta_fire = EEPROM.readString(address);
      Firebase.begin(DB_URL, DB_SECRET);
      Firebase.reconnectWiFi(true);
    }
  }
  else estado=UNCON;
 
}

void loop() {
  switch(estado){
    case UNCON:
      //EN CASO DE QUE EL WIFI NO ESTE CONECTADO
      if(!btEn){SerialBT.begin("MiPlanty"); btEn=true;}
     
      if(SerialBT.available()){           //Si hay datos disponibles
        inst = SerialBT.readString();     //se leen y se almacenan en la variable "inst"
        instChanged = true;               //y se da aviso que inst fue modificada, con la variable "instChanged" (si inst fue modificada,
      }                                   //es lo mismo que decir que se leyeron datos nuevos del puerto serie)
     
      if(instChanged){
        Serial.println(inst);
      }



      if(inst == "SSID" && instChanged) SSID_select=true; //Si el dato recibido fue "SSID", eso indica que el siguiente dato recibido será el SSID de la red
      else if(SSID_select && instChanged){
        SSID = "";
        PASS = "";
        ruta_fire = "";
        for(int i=0; i<inst.length()+1; i++){
          if(inst[i] != '$'){
            if(SSID_select){
              SSID += " ";
            }
            else if(PASS_select){
              PASS += " ";
            }
            else{
              ruta_fire += " ";
            }
          }
          else{
            ad_aux=i+1;
            if(SSID_select){SSID_select=false; PASS_select=true;}
            else if(PASS_select){PASS_select=false;}
          }
         
        }
        SSID_select = true;
        for(int i=0; i<inst.length()+1; i++){
          if(inst[i] != '$'){
            if(SSID_select){
              SSID[i] = inst[i];
            }
            else if(PASS_select){
              PASS[i-ad_aux] = inst[i];
            }
            else{
              ruta_fire[i-ad_aux] = inst[i];
            }
          }
          else{
            ad_aux=i+1;
            if(SSID_select){SSID_select=false; SSID_changed=true; PASS_select=true;}
            else if(PASS_select){PASS_select=false; PASS_changed=true;}
          }
        }
        Serial.print("POST FOR: ");
        Serial.print(SSID + " ");
        Serial.print(PASS + " ");
        Serial.println(ruta_fire);

      }
     
      if(SSID_changed && PASS_changed){
        //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
        char SSID_c[SSID.length()];
        for (int i = 0; i < SSID.length()+1; i++) {
            SSID_c[i] = SSID[i];
        }
        char PASS_c[PASS.length()];
        for (int i = 0; i < PASS.length()+1; i++) {
            PASS_c[i] = PASS[i];
        }
        //FIN DE CONVERSIÓN
        WiFi.begin(SSID_c, PASS_c);
        Serial.println(SSID_c);
        Serial.println(PASS_c);
        Serial.println("Intentando");
        SerialBT.print("TRY$");
        long aux = millis();
        while(WiFi.status() != WL_CONNECTED){
          Serial.print(".");
          delay(500);
          if(millis()-aux > 30000){
            SerialBT.print("FAIL$");
            break;
          }
        }
        SSID_changed = false;
        PASS_changed = false;
      }

      instChanged = false;

      //CONDICION CAMBIO DE ESTADO
      if(WiFi.status() == WL_CONNECTED){
        SerialBT.print("CONNECTED$");
        Serial.println("Conectando");
        address = 0;
        EEPROM.writeString(address, SSID);
        address += (SSID.length()+1);
        EEPROM.writeString(address, PASS);
        address += (PASS.length()+1);
        EEPROM.writeString(address, ruta_fire);
        EEPROM.commit();
        EEPROM.end();
        estado=CON_FIREUNCON;
        Serial.println("Conectado");
      }
    break;
   
    case CON_FIREUNCON:
      if(true){
        estado = CON_FIRECON;
        Firebase.begin(DB_URL, DB_SECRET);
        Firebase.reconnectWiFi(true);
        SerialBT.end();
        btEn = false;
        //EEPROM.end();
      }
    break;

    case CON_FIRECON:
      //CHEQUEO ENCENDIDO RELE
      Firebase.getBool(fbdo, "/Users/" + ruta_fire + "/en");
      if(fbdo.boolData()) digitalWrite(RELE, 1);
      else digitalWrite(RELE, 0);
     
      //LECTURA TEMPERATURA
      temp = dht22.readTemperature();
      //LECTURA HUMEDAD
      hum = dht22.readHumidity();
      //SUBIR DATOS A FIREBASE
      Firebase.setFloat(fbdo, "/Users/" + ruta_fire + "/values/temp", temp);
      Firebase.setFloat(fbdo, "/Users/" + ruta_fire + "/values/hum", hum);
     
      //Chequeo
      Serial.print(temp);
      Serial.print("  ");
      Serial.print(hum);
      Serial.println("  ");
    break;
  }
}