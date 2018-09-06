function searchTwitter(keyWord = "world disaster"){

    let ajaxConfig = {
        url: 'https://s-apis.learningfuze.com/hackathon/twitter/index.php?',
        method: 'post',
        dataType: 'json',
        data: {
            search_term: keyWord
        },
        success: function (dataReceived) {
            renderTweets(dataReceived);
        }
    };
    $.ajax(ajaxConfig);
}

searchTwitter();

function renderTweets(dataReceived) {
    $('#tab2default').empty()
    let tweetData = dataReceived.tweets.statuses
    if(!tweetData.length){
        $('<div>').text("No Tweets Found On This Topic").appendTo("#tab2default")
    }

    for (let i = 0; i < tweetData.length; i++){
        let tweetText = tweetData[i].text;

        //if a retweet, then use original text
        if (tweetData[i].retweeted_status){
            tweetText = tweetData[i].retweeted_status.text
        }

        //makes hyperlinks
        if(tweetText.indexOf("https://") !== -1){
            let linkText = tweetText.match(/https\S+/)[0]
            tweetText = tweetText.replace(linkText, linkText.link(linkText))
        }

        let twitterName = dataReceived.tweets.statuses[i].user.screen_name;
        let tweetNameDiv = $('<div>').text(`@${twitterName}`).addClass('tweetName');
        let tweetTextDiv = $('<div>').html(tweetText).addClass('tweets');
        $('#tab2default').append(tweetNameDiv, tweetTextDiv);
    }
}
