
import { Vec2 } from "@repcomm/vec2d";

/**Bounding box 2d
 * 
 */
export class AABB {
  position: Vec2;
  size: Vec2;
  velocity: Vec2;

  constructor() {
    this.position = new Vec2();
    this.size = new Vec2();
  }
  /**
   * https://www.gamedev.net/articles/programming/general-and-gameplay-programming/swept-aabb-collision-detection-and-response-r3084/
   * @param b1 
   * @param b2 
   * @param outNormal 
   * @returns time between 0 and 1 of collision, 1 being no collision
   */
  static sweep(b1: AABB, b2: AABB, outNormal: Vec2): number {
    //b1 is moving

    // let invEntry: Vec2;
    let xInvEntry = 0;
    let yInvEntry = 0;
    let xInvExit = 0;
    let yInvExit = 0;

    // find the distance between the objects on the near and far sides for both x and y

    if (b1.velocity.x > 0.0) {
      xInvEntry = b2.position.x - (b1.position.x + b1.size.x);
      xInvExit = (b2.position.x + b2.size.x) - b1.position.x;
    } else {
      xInvEntry = (b2.position.x + b2.size.x) - b1.position.x;
      xInvExit = b2.position.x - (b1.position.x + b1.size.x);
    }

    if (b1.velocity.y > 0.0) {
      yInvEntry = b2.position.y - (b1.position.y + b1.size.y);
      yInvExit = (b2.position.y + b2.size.y) - b1.position.y;
    } else {
      yInvEntry = (b2.position.y + b2.size.y) - b1.position.y;
      yInvExit = b2.position.y - (b1.position.y + b1.size.y);
    }

    //let entryVec = new Vec2();
    //let exitVec = new Vec2();
    let xEntry = 0;
    let yEntry = 0; 
    let xExit = 0;
    let yExit = 0; 
    
    if (b1.velocity.x == 0.0) { 
      xEntry = -Math.Infinity; 
      xExit = Math.Infinity; 
    } else { 
      xEntry = xInvEntry / b1.velocity.x; 
      xExit = xInvExit / b1.velocity.x;
    } 
    
    if (b1.velocity.y == 0.0) { 
      yEntry = -Math.Infinity;
      yExit = Math.Infinity;
    } else { 
      yEntry = yInvEntry / b1.velocity.y; 
      yExit = yInvExit / b1.velocity.y; 
    }

    //TODO
    // find the earliest/latest times of collisionfloat 
    let entryTime = Math.max(xEntry, yEntry); 
    let exitTime = Math.min(xExit, yExit);

    // if there was no collision
    if (
   	  entryTime > exitTime ||
   	  xEntry < 0.0 && yEntry < 0.0 ||
   	  xEntry > 1.0 ||
   	  yEntry > 1.0
    ) { 
      outNormal.x = 0.0; 
      outNormal.y = 0.0; 
      return 1.0;
    } else { 
     // calculate normal of collided surface
     if (xEntry > yEntry) { 
       if (xInvEntry < 0.0) { 
         outNormal.x = 1.0; 
         outNormal.y = 0.0; 
       } else { 
         outNormal.x = -1.0; 
         outNormal.y = 0.0;
       }
     } else { 
       if (yInvEntry < 0.0) { 
         outNormal.x = 0.0; 
         outNormal.y = 1.0; 
       } else { 
         outNormal.x = 0.0; 
         outNormal.y = -1.0; 
       } 
     } // return the time of collisionreturn entryTime; 
   }

   
  }

  //TODO - doesn't work for non-halfExtents
  static extend(aabb: AABB, left: number, right: number, up: number, down: number) {
    if (left !== 0) {
      aabb.size.x += left / 2;
      aabb.position.x -= left / 2;
    }
    if (right !== 0) {
      aabb.size.x += right / 2;
      aabb.position.x += right / 2;
    }
    if (up !== 0) {
      aabb.size.y += up / 2;
      aabb.position.y -= up / 2;
    }
    if (down !== 0) {
      aabb.size.y += down / 2;
      aabb.position.y += down / 2;
    }
  }

}
