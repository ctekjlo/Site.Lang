Site.Lang
=========

### Use

#### Старт

    Site.Lang.init("en", {
      "Message 1": "Message 1 EN",
      "Message 2": "Message 2 EN"
    });
    
	Site.Lang.init("ru", {
      "Message 1": "Message 1 RU",
      "Message 2": "Message 2 RU"
    });
    
    Site.Lang.init("de", {
      "Message 1": "Message 1 DE",
      "Message 2": "Message 2 DE"
    });

##### Получить список языков

    var langs = Site.Lang.getLangs();
    
    console.log ( langs );

#### Добавить обновить

##### Обновить сообщение во всех языках

    Site.Lang.set("Message 1", "For All");
    
##### Обновить сообщение в заданом языке

    oLang.set("en", "Message 1", "For EN Message 1");


// Get Messages
console.log ( oLang.get("ru") );
console.log ( oLang.get("Message 1") );
console.log ( oLang.get("en", "Message 1") );