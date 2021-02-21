import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-deploy-it-new e2e', () => {
  it('should create nx-deploy-it-new', async (done) => {
    const plugin = uniq('nx-deploy-it-new');
    ensureNxProject(
      '@dev-thought/nx-deploy-it-new',
      'dist/libs/nx-deploy-it-new'
    );
    await runNxCommandAsync(
      `generate @dev-thought/nx-deploy-it-new:nx-deploy-it-new ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-deploy-it-new');
      ensureNxProject(
        '@dev-thought/nx-deploy-it-new',
        'dist/libs/nx-deploy-it-new'
      );
      await runNxCommandAsync(
        `generate @dev-thought/nx-deploy-it-new:nx-deploy-it-new ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-deploy-it-new');
      ensureNxProject(
        '@dev-thought/nx-deploy-it-new',
        'dist/libs/nx-deploy-it-new'
      );
      await runNxCommandAsync(
        `generate @dev-thought/nx-deploy-it-new:nx-deploy-it-new ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
