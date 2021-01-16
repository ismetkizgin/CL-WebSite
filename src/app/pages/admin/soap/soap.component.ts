import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss'],
})
export class SoapComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  _name: string;
  result: any;
  async onSave(soapForm: NgForm) {
    this.http
      .post(
        'http://localhost:5001/hello?wsdl',
        `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <HelloRequest xmlns="http://tempuri.org/">
                <name>${soapForm.value.name}</name>
            </HelloRequest>
        </Body>
    </Envelope>`,
        {
          headers: { 'Content-Type': 'text/xml', Accept: '*/*' },
          observe: 'body',
          responseType: 'text',
        }
      )
      .subscribe(
        (data) => {
          let parser = new DOMParser();
          let xmlData = parser.parseFromString(data, 'text/xml');
          this.result = xmlData.getElementsByTagName(
            'HelloResponse'
          )[0].childNodes[0].nodeValue;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
