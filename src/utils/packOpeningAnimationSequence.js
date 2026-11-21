/**
 * Card Pack Opening Animation State Machine
 */
export class PackAnimationFsm {
  constructor() {
    this.state = 'IDLE'; // IDLE -> PACK_HOVER -> TEARING -> REVEALING -> SUMMARY
  }

  startTear() {
    if (this.state === 'IDLE' || this.state === 'PACK_HOVER') {
      this.state = 'TEARING';
      return true;
    }
    return false;
  }

  completeTear() {
    if (this.state === 'TEARING') {
      this.state = 'REVEALING';
      return true;
    }
    return false;
  }

  showSummary() {
    if (this.state === 'REVEALING') {
      this.state = 'SUMMARY';
      return true;
    }
    return false;
  }
}
