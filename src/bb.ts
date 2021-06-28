
import { Vec2 } from "@repcomm/scenario2d";

export class AABB {
  position: Vec2;
  halfExtents: Vec2;
  velocity: Vec2;

  constructor() {
    this.position = new Vec2();
    this.halfExtents = new Vec2();
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
    let xInvEntry, yInvEntry;
    let xInvExit, yInvExit;

    // find the distance between the objects on the near and far sides for both x and y 
    if (b1.velocity.x > 0.0) {
      xInvEntry = b2.position.x - (b1.position.x + b1.halfExtents.w);
      xInvExit = (b2.x + b2.w) - b1.x;
    } else 
{
  xInvEntry = (b2.x + b2.w) - b1.x;
  xInvExit = b2.x - (b1.x + b1.w);
}

if (b1.vy > 0.0f)
{
  yInvEntry = b2.y - (b1.y + b1.h);
  yInvExit = (b2.y + b2.h) - b1.y;
}
else
{
  yInvEntry = (b2.y + b2.h) - b1.y;
  yInvExit = b2.y - (b1.y + b1.h);
}
  }
  static extend(aabb: AABB, left: number, right: number, up: number, down: number) {
  if (left !== 0) {
    aabb.halfExtents.x += left / 2;
    aabb.position.x -= left / 2;
  }
  if (right !== 0) {
    aabb.halfExtents.x += right / 2;
    aabb.position.x += right / 2;
  }
  if (up !== 0) {
    aabb.halfExtents.y += up / 2;
    aabb.position.y -= up / 2;
  }
  if (down !== 0) {
    aabb.halfExtents.y += down / 2;
    aabb.position.y += down / 2;
  }
}
  
}
