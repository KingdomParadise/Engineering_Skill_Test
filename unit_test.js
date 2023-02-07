describe('deterministicPartitionKey', () => {
  test('returns "0" when event is falsy', () => {
    expect(exports.deterministicPartitionKey(null)).toBe("0");
  });

  test('returns the partitionKey if it exists in the event', () => {
    const event = { partitionKey: 'testKey' };
    expect(exports.deterministicPartitionKey(event)).toBe('testKey');
  });

  test('returns a sha3-512 hash of the event if partitionKey does not exist', () => {
    const event = { test: 'event' };
    const hash = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    expect(exports.deterministicPartitionKey(event)).toBe(hash);
  });

  test('returns a sha3-512 hash of a stringified non-string partitionKey', () => {
    const event = { partitionKey: { test: 'key' } };
    const hash = crypto.createHash('sha3-512').update(JSON.stringify(event.partitionKey)).digest('hex');
    expect(exports.deterministicPartitionKey(event)).toBe(hash);
  });

  test('returns a sha3-512 hash of a partitionKey that is too long', () => {
    const longKey = 'a'.repeat(257);
    const event = { partitionKey: longKey };
    const hash = crypto.createHash('sha3-512').update(longKey).digest('hex');
    expect(exports.deterministicPartitionKey(event)).toBe(hash);
  });
});
