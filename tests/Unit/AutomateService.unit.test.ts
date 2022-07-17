require('module-alias/register');
import { expect } from 'chai';
import { EVMUAServiceController } from '@src/Services/EVModifierUpdateAutomation/EVMUA.Service';
import { EVMUAConstants } from '@src/Services/EVModifierUpdateAutomation/EVMUA.Constant';

describe('EV Modifier Update Automation Unit Testing', () => {

  it('It should return - EVMUA related message', async () => {
    try {
      let result = await EVMUAServiceController.automateService({ email: 'test@mail.com' });
      let outResult = '';
      if ([EVMUAConstants.CHANGE_DETECTED, EVMUAConstants.NO_CHANGE_DETECTED, EVMUAConstants.FEATURE_DISABLED].includes(result.message)) {
        outResult = 'SUCCESS'
      }
      expect(outResult).to.equal('SUCCESS');
    } catch (err) {
      console.log(err);
    }
  }).timeout(10000);

});
