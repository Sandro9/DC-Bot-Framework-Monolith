# Monolith

Monolith ist ein nodeJS basiertes Framework für die einfache Erstellung und Konfiguration von Discord Bots basierend auf dem Discord.js Framework. 


## Requirements
- letzte nodeJS Version
- funktionierende MongoDB Datenbank

## Installation

Nach dem Klonen des Repositorys kann mithilfe folgenden Befehles, alle Projekt Abhängigkeiten installiert werden: 

```
npm run install
```

## Konfiguration

Zum starten der App muss unter
```
 application/Monolith/Configs/
 ```
 die MainConfig.example.ts zu MainConfig.ts umbenannt und anschließend richtig konfiguriert werden.

## Start
Zum schnellstart Verfügt die Monolith Applikation eine kleine Demo, die die Architektur verdeutlichen soll.

Zum Start der App:
```
npm run exec
```

## Funktionsweise

Das Framework arbeitet nach dem MVC - Model - View - Controller Prinzip.
Das heißt, es befindet sich unter application_mvc ein Verzeichnis "App" darunter können eigene Applications wie die bereits vorkonfigurierte demo-App erstellt werden.

Jede App besitzt jeweils ein "seite" Verzeichnis, in dem Discord-Events registriert werden können.
```
/application_mvc/app/demo_app/seite/channelCreate/
```

In jedem Verzeichnis muss jeweils ein Template und ein Controller der den template_base_controller erweitert sein.

Der Controller kann mithilfe der
```
registriere_template_variable('variable_name', wert);
```
Methode Werte an das Template geben. Die genaue Dokumentation und Syntax der Kontrollstrukturen im Template kann hier eingesehen werden: [Dokumentation](https://liquidjs.com)

### Template Typen

#### Event-Templates
An oberster Stelle stehen sogenannte Event-Templates, welche unter /seite/ in jedem Modul registriert werden können.

#### Interaction-Templates
Interaction Templates sind besondere Event-Templates. Diese können unter /seite/interaction/interaction_name/
registriert werden.

```xml
<template>
    {% if condition === true %}
        <rechte>
            <options>
                <recht>1912455235235</recht>
            </options>
            <bausteine>
                <baustein>
                    <pfad>/rightError/</pfad>
                </baustein>
            </bausteine>
        </rechte>
    {% endif %}
    <seite>
        <bausteine>
            <baustein>
                <pfad>/textAntwort/</pfad>
            </baustein>
        </bausteine>
    </seite>
    <befehl>   
        <ID>interaction_name</ID>
        <daten>
            <name>interaction_name</name>
            <description>Beschreibungstext</description>
            <rechte>
                <dm>false</dm>
            </rechte>
        </daten>
    </befehl>
</template>
```

###### Berechtigungen [optional]
Um Ein Befehl nur für bestimmte Rollen ausführbar zu machen kann unter rechte -> options -> recht die erlaubten RollenIDs konfiguriert werden. 
Unter bausteine kann eine Fehlermeldung konfiguriert werden wenn keine Berechtigung zum ausführen besteht.

###### Antwort [optional]
Jedes Template kann mithilfe von **Bausteinen** eine Antwort konfiguriert werden.

###### BefehlConfig [benötigt]
**ID**: name des Befehls
**Name**: Anzeigename des Befehls
**Description**: Beschreibungstext

#### Bausteine
Diese Referenzieren auf einbindbare Bausteine unter /baustein/ die für den Response in Channeln oder als PM Message/Modal/Select-Menus zuständig sind.

```xml
<baustein>
    <antworten>
        <antwort>
            <typ>CHANNEL</typ>
            <ID>523950235523</ID>
        </antwort>
        <antwort>
            <typ>EDIT</typ>
            <ID>447623856325</ID>
        </antwort>
        <antwort>
            <typ>REPLY</typ>
            <ephemeral>true</ephemeral>
        </antwort>
        <antwort>
            <typ>MODAL</typ>
        </antwort>
         <antwort>
            <typ>DM</typ>
            <ID>523536346346</ID>
        </antwort>
    </antworten>
    <seite>
        <bausteine>
            <baustein>
                <pfad>/antwort/embed/</pfad>
            </baustein>
        </bausteine>
    </seite>
</baustein>
```
###### Antwort [benötigt]
Jeder Baustein muss mind. eine Antwort aufweisen. Eine Antwort kann vom Typ CHANNEL|EDIT|REPLY|MODAL oder DM sein.
REPLY darf nur als Antwort auf Interactions erfolgen. Edit kann eine bereits gesendete Nachricht überschreiben.

###### Sub-Baustein-Config [benötigt]
Referenz auf Subbausteine


#### Sub-Bausteine
Bausteine können Subbausteine einbinden, die wiederum die Konfiguration für den Response an sich wie Buttons, Embeds, Selectmenus und Modal-Elementen beinhalten.

Konfigurations-Beispiele:

###### Button

```xml
<baustein>
    <typ>button</typ>
    <daten>
        <style>Primary</style>
        <label>Modal Demo</label>
        <disabled>false</disabled>
        <emoji></emoji>
        <customid>1234</customid>
    </daten>
</baustein>
```

###### Selectmenu
```xml
<baustein>
    <typ>selectmenu</typ>
    <daten>
        <customid>id</customid>
        <disabled>false</disabled>
        <placeholder>placeholder</placeholder>
        <options>
            <option>
                <label>select</label>
                <description>select</description>
                <value>first</value>
            </option>
            <option>
                <label>select2</label>
                <description>select2</description>
                <value>second</value>
            </option>
        </options>
        <minvalues>0</minvalues>
        <maxvalues>2</maxvalues>
    </daten>
</baustein>
```

###### Embed
```xml
<baustein>
    <typ>embed</typ>
    <daten>
        <color>0x0099FF</color>
        <title>TITEL</title>
        <url>https://example.com</url>
        <author>
            <name>Name</name>
            <iconurl>http://icon_url/icon.jpg</iconurl>
            <url>https://discord.js.org</url>
        </author>
        <description>Hello World!</description>
        <fields>
            <field>
                <name>Field 1</name>
                <value>value</value>
            </field>
        </fields>
        <imageurl>http://image_url/img.png</imageurl>
        <timestamp>2022-09-23T19:03:11.217Z</timestamp>
        <footer>
            <text>Lorem</text>
            <iconurl>http://icon_url/icon.jpg</iconurl>
        </footer>
    </daten>
</baustein>
```


###### Modal
```xml
<baustein>
    <typ>modal</typ>
    <daten>
        <customid>modalID</customid>
        <title>Your Title</title>
    </daten>
</baustein>
```

###### Modal-Input
```xml
<baustein>
    <typ>textinput</typ>
    <daten>
        <customid>textID</customid>
        <label>Lorem</label>
        <style>Paragraph</style>
        <value>Lorem ipsum</value>
        <placeholder>Lorem</placeholder>
        <maxlength>1000</maxlength>
        <minlength>300</minlength>
        <required>true</required>
    </daten>
</baustein>
```

### Errors

Zur Laufzeit auftretende Fehler des Frameworks werden in einem Log unter /Log/ gespeichert.



### Logging

###### CMD
logging via command-line über vorkonfigurierte farb-configurationen. 
```ts
new CmdLogger({
    'selectedPreset': 'ERROR'
}).log(err)
```

###### File
logging via command-line über vorkonfigurierte farb-configurationen. 
```ts
new FileLogger({logName: 'log_name.txt'}).log('log_message')
```
### Weiterentwicklung

Beim Verändern/Hinzufügen von Templates muss zusätzlich der Befehl 
```
npm run liquid
```
oder
```
npm run install
```

ausgeführt werden. Somit werden alle Liquid-Templates automatisch in das bin Verzeichnis kopiert.

## To-Do

- Als eigenes npm Repository auslagern
- Die App über einen Websocket an andere Services anbindbar machen
- weitere Discord-Events Supporten
