var msgCount = 0

function l(...msgs){
    if(msgCount > 0){
        console.log(...msgs)
        msgCount--
    }
}

function setlog(n){
    msgCount = n
}