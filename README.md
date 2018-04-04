# iotest
Raspi (Raspberry pi 3 B+) ioTest

My attempt at getting the Raspberry pi 3 B+ to work as a webserver.
-The client has a button to turn on pin 7 on the raspberry pi which I attached an LED.
it worked fine but the LED will not stay on after I turned it on. Will check on a 2 B to see if the issue is compatability with the new raspi model.
update- tried it on a raspberry pi 2 Model B v1.1 and it does the same. Also tried it with no interaction from the client, where I added a output.write(1) strait after the output is created and same effect.
I don't think it has anything to do with the async nature of javascript but I do need to find a way to deal with it.

All Solved! the problem with the LED on Pin 7 is the fact that the pin is also used for the 1 wire interface which I had enabled on the Raspberry pi configuration file. So Or you disable the 1 wire interface and use the pin & GPIO-04 or use another pin.
Please note that you may have a similar issue with another pin so check.

check this interesting post about use of the socket id, it may become relevant which choice to make in the future.

I believe both @Curious and @MustafaDokumacı provided solutions that work well. The difference though is that with @MustafaDokumacı's solution the message is broadcasted to a room and not only to a particular client.

The difference is prominent when an acknowledgement is requested.

io.sockets.connected[socketid].emit('message', 'for your eyes only', function(data) {...});

works as expected, while

io.to(socketid).emit('message', 'for your eyes only', function(data) {...});

fails with

Error: Callbacks are not supported when broadcasting




