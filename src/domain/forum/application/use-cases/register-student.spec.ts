import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { RegisterStudentUseCase } from './register-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to register a student', async () => {
    const result = await sut.execute({
      name: 'John doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should register student passwrod upon registration', async () => {
    const result = await sut.execute({
      name: 'John doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordHashed = await fakeHasher.compare(
      '123456',
      inMemoryStudentsRepository.items[0].password,
    )

    expect(result.isRight()).toBe(true)
    expect(isPasswordHashed).toBeTruthy()
  })
})
