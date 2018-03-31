# iotest
Raspi (Raspberry pi 3 B+) ioTest

My attempt at getting the Raspberry pi 3 B+ to work as a webserver.
-The client has a button to turn on pin 7 on the raspberry pi which I attached an LED.
it worked fine but theLED will not stay on after I turned it on. Will check on a 2 B to see if the issue is compatability with the new raspi model.
update- tried it on a raspberry pi 2 Model B v1.1 and it does the same. Also tried it with no interaction from the client, where I added a output.write(1) strait after the output is created and same effect.
I don't think it has anything to do with the async nature of javascript but I do need to find a way to deal with it.
