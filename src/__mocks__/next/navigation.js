const MockedModule = jest.genMockFromModule("next/navigation");

MockedModule.usePathname.mockImplementation(() => {
  return "/about";
});

module.exports = MockedModule;
