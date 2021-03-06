describe('Taka.vehicles.Vehicle', function() {
    "use strict";

    var vehicle;
    var onUpdate = {
        callback : function() {}
    };

    beforeEach(function() {
        vehicle = new Taka.vehicles.Vehicle('theSprite', 1, 2, 3, 4, 5, 6, 7, Taka.ordnance.PlayerBullet, onUpdate.callback);
    });

    describe('constructor', function() {
        it('should initialise the object correctly', function() {
            expect(vehicle.sprite).toBe('theSprite');
            expect(vehicle.width).toBe(1);
            expect(vehicle.height).toBe(2);
            expect(vehicle.x).toBe(3);
            expect(vehicle.y).toBe(4);
            expect(vehicle.speed).toBe(5);
            expect(vehicle.life).toBe(6);
            expect(vehicle.fireFreq).toBe(7);

            expect(vehicle.firedLast.toString().length).toBe(13);
            expect(vehicle.moveUp).toBe(false);
            expect(vehicle.moveDown).toBe(false);
            expect(vehicle.moveLeft).toBe(false);
            expect(vehicle.moveRight).toBe(false);
            expect(vehicle.fire).toBe(false);
            expect(vehicle.velX).toBe(0);
            expect(vehicle.velY).toBe(0);
        });
    });

    describe('prototype', function() {
        it('should update the velocity', function() {
            vehicle.moveUp = true;
            vehicle.update();
            expect(vehicle.velY).toBe(-5);

            vehicle.moveUp = false;
            vehicle.moveDown = true;
            vehicle.update();
            expect(vehicle.velY).toBe(5);

            vehicle.moveLeft = true;
            vehicle.update();
            expect(vehicle.velX).toBe(-5);

            vehicle.moveLeft = false;
            vehicle.moveRight = true;
            vehicle.update();
            expect(vehicle.velX).toBe(5);
        });

        if('should invoke the onUpdate callback', function() {
            spyOn(onUpdate, 'callback');
            vehicle.update();
            expect(onUpdate.callback).toHaveBeenCalled();
        });

        it('should return the velocity', function() {
            vehicle.velX = 21;
            vehicle.velY = 42;
            var vel = vehicle.getVelocity();
            expect(vel.x).toBe(21);
            expect(vel.y).toBe(42);
        });

        it('should set the position', function() {
            vehicle.setPos(21, 42);
            expect(vehicle.x).toBe(21);
            expect(vehicle.y).toBe(42);
        });

        it('should return the position', function() {
            var pos = vehicle.getPos();
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(4);
        });

        it('should return the sprite', function() {
            expect(vehicle.getSprite()).toBe('theSprite');
        });

        it('should get a new bullet instance', function() {
            var bullet = vehicle.getBullet();
            expect(bullet instanceof Taka.ordnance.Bullet).toBe(true);
        });
    });

});