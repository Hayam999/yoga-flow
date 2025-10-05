/** 
PRUPOSE: Ask Backend Server for getting all yoga Poses

 * Signature: void -> Promise<Array<YogaPose>>
 * where YogaPose is { id: number, name: string, difficulty: string, duration: number }
 * 
@returns {Promise<Array<object>>}
 */
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getData };
