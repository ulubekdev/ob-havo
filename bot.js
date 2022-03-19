const { Bot } = require("grammy");

const fetch = require('node-fetch');

const apiKey = "11d72e8bb8a918a55067180e4e152f26";

const bot = new Bot("5151716824:AAE4Zc-4DHvEWeVfLpYN-f9vyZrC5ELd3Rw");

bot.command("start", (msg) => msg.reply("Assalomu alaykum! Botni ishga tushirish uchun shahar nomini kiriting."));

bot.on("message", (msg) => {
    async function fetchWeather() {
        let status;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${msg.message.text}&appid=${apiKey}`;

        let res = await fetch(url);
        res = await res.json();
        
        if(res.weather[0].description.includes("clear")) {
            status = "🌞Quyosh";
        } else if(res.weather[0].description == "few clouds" ) {
            status = "⛅Biroz bulutli";
        } else if(res.weather[0].description.includes("clouds")) {
            status = "☁️Bulutli";
        } else if(res.weather[0].description.includes("rain") || res.weather[0].description.includes("drizzle")) {
            status = "🌧Yomg'ir";
        } else if(res.weather[0].description.includes("snow")) {
            status = "🌨Qor";
        } else if(res.weather[0].description.includes("mist") || res.weather[0].description.includes("fog") || res.weather[0].description.includes("haze") || res.weather[0].description.includes("smoke") || res.weather[0].description.includes('sand') || res.weather[0].description.includes('ash') || res.weather[0].description.includes('squall')) {
            status = "🌫Tuman";
        } else if(res.weather[0].description.includes("thunderstorm")) {
            status = "🌩Momaqaldiroq";
        } else if(res.weather[0].description.includes("dust")) {
            status = "🏜Chang";
        } else if(res.weather[0].description.includes("tornado")) {
            status = "🌪Tornado";
        } else if(res.weather[0].description.includes("hurricane")) {
            status = "🌀Bo'ron";
        }

        msg.reply(`${res.name}\n\n${status}\n🌡Havo harorati - ${Math.round(res.main.temp - 273.15)}°C\n🔽 Bosim - ${res.main.pressure} hpa\n💧Namlik - ${res.main.humidity}%\n🌬Shamol tezligi - ${res.wind.speed} m/s\n🌅Quyosh chiqishi - ${new Date(res.sys.sunrise * 1000).toLocaleTimeString('en-GB')}\n🌇Quyosh botishi - ${new Date(res.sys.sunset * 1000).toLocaleTimeString('en-GB')}\n`);
    }
    fetchWeather();
});


bot.catch((err) => console.log(err.message));
bot.start();