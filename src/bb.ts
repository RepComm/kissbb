
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
    let xInvEntry: number;
    let yInvEntry: number;
    let xInvExit: number;
    let yInvExit: number;

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
    }
    else {
      yInvEntry = (b2.position.y + b2.size.y) - b1.position.y;
      yInvExit = b2.position.y - (b1.position.y + b1.size.y);
    }
  }
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
