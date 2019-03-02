#include "DHT.h"        // including the library of DHT11 temperature and humidity sensor
#define DHTTYPE DHT11   // DHT 11

#define dht_dpin D7
#include <Wire.h>

// ADXL345 I2C address is 0x53(83)
#define Addr 0x53
#include <SoftwareSerial.h>

DHT dht(dht_dpin, DHTTYPE);

const int GSR = A0;
int sensorValue = 0;
int gsr_average = 0;

SoftwareSerial BTserial(D4, D3);
SoftwareSerial serial(9, 10);

char sbuffer[14], ch;
unsigned char pos;
unsigned char read1, read2, read3;
boolean newData = false;

void setup() {
  dht.begin();
  Serial.begin(9600);
  Serial.println("Humidity and temperature\n\n");
  delay(700);

  // Initialise I2C communication as MASTER
  Wire.begin();
  // Initialise serial communication, set baud rate = 9600
  Serial.begin(9600);

  // Start I2C Transmission
  Wire.beginTransmission(Addr);
  // Select bandwidth rate register
  Wire.write(0x2C);
  // Normal mode, Output data rate = 100 Hz
  Wire.write(0x0A);
  // Stop I2C transmission
  Wire.endTransmission();

  // Start I2C Transmission
  Wire.beginTransmission(Addr);
  // Select power control register
  Wire.write(0x2D);
  // Auto-sleep disable
  Wire.write(0x08);
  // Stop I2C transmission
  Wire.endTransmission();

  // Start I2C Transmission
  Wire.beginTransmission(Addr);
  // Select data format register
  Wire.write(0x31);
  // Self test disabled, 4-wire interface, Full resolution, Range = +/-2g
  Wire.write(0x08);
  // Stop I2C transmission
  Wire.endTransmission();
  delay(3000);
}

void loop() {
  // put your main code here, to run repeatedly:
  temp();
  Serial.println("|");
//acc();
  recvChar();
  Serial.println("|");
    gsr();
  Serial.println("|");
}


void gsr() {
  long sum = 0;
  for (int i = 0; i < 10; i++)    //Average the 10 measurements to remove the glitch
  {
    sensorValue = analogRead(GSR);
    sum += sensorValue;
    delay(5);
  }
  gsr_average = sum / 10;
  Serial.println(String(gsr_average));
}


void temp() {
//  float h = dht.readHumidity();
  float t = dht.readTemperature();

//  Serial.print("Current humidity = ");
 // Serial.print(h);
  //Serial.print("%  ");
  //Serial.print("temperature = ");
  Serial.println(String(t));
  //Serial.println("C  ");
  //delay(2000);
}


void acc()
{
  unsigned int data[6];
  for (int i = 0; i < 6; i++)
  {
    // Start I2C Transmission
    Wire.beginTransmission(Addr);
    // Select data register
    Wire.write((50 + i));
    // Stop I2C transmission
    Wire.endTransmission();

    // Request 1 byte of data
    Wire.requestFrom(Addr, 1);

    // Read 6 bytes of data
    // xAccl lsb, xAccl msb, yAccl lsb, yAccl msb, zAccl lsb, zAccl msb
    if (Wire.available() == 1)
    {
      data[i] = Wire.read();
    }
  }

  // Convert the data to 10-bits
  int xAccl = (((data[1] & 0x03) * 256) + data[0]);
  if (xAccl > 511)
  {
    xAccl -= 1024;
  }
  int yAccl = (((data[3] & 0x03) * 256) + data[2]);
  if (yAccl > 511)
  {
    yAccl -= 1024;
  }
  int zAccl = (((data[5] & 0x03) * 256) + data[4]);
  if (zAccl > 511)
  {
    zAccl -= 1024;
  }

  // Output data to serial monitor
  Serial.print("Acceleration in X-Axis is : ");
  Serial.println(xAccl);
  Serial.print("Acceleration in Y-Axis is : ");
  Serial.println(yAccl);
  Serial.print("Acceleration in Z-Axis is : ");
  Serial.println(zAccl);
  delay(300);
}

void recvChar() {
  if (Serial.available() > 0)
  {
    while (Serial.available() > 0)
    {
      ch = Serial.read(); //loop till character received
      if (ch == 0x0A) // if received character is <LF>, 0x0A, 10 then process buffer
      {
        pos = 0; // buffer position reset for next reading
        newData = true;
        // extract data from serial buffer to 8 bit integer value
        // convert data from ASCII to decimal
        read1 = ((sbuffer[1] - '0') * 100) + ((sbuffer[2] - '0') * 10) + (sbuffer[3] - '0');
        read2 = ((sbuffer[6] - '0') * 100) + ((sbuffer[7] - '0') * 10) + (sbuffer[8] - '0');
        read3 = ((sbuffer[11] - '0') * 100) + ((sbuffer[12] - '0') * 10) + (sbuffer[13] - '0');
       // Serial.println("Calculating Results ... ");
        //Serial.println("high");
        Serial.println(String(read1));
        //Serial.println("low");
        Serial.println(String(read2));
       // Serial.println("pulse rate");
        Serial.println(String(read3));
      }
      else
      { //store serial data to buffer
        sbuffer[pos] = ch;
        pos++;
      }
    }
  }
}
