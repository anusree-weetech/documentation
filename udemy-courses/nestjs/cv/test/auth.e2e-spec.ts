// describe('Authentication System', () => {
//   beforeEach(async () => {
//     // Create new app instance
//     const app = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     // Reset or recreate the database
//     await resetDatabase(); // Custom function to reset DB

//     // Proceed with tests
//     await app.init();
//   });

//   it('handles a sign up request', async () => {
//     await request(app.getHttpServer())
//       .post('/auth/signup')
//       .send({ email: uniqueEmail, password: 'password' })
//       .expect(201);
//   });
// });
